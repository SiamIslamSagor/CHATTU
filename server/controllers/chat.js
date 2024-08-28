//

import { ALERT, REFETCH_CHAT } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { emitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  if (members.length < 2)
    return next(
      new ErrorHandler("Group chat must have at least 3 members", 400)
    );

  const allMembers = [...members, req.user];

  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);

  emitEvent(req, REFETCH_CHAT, members);

  return res.status(201).json({
    success: true,
    message: "Group Created",
  });
});

const getMyChat = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({ members: req.user }).populate(
    // populate like mongodb pipeline
    "members",
    "name avatar"
  );

  const transformedChats = chats.map(
    ({ _id, name: groupName, groupChat, members }) => {
      //   const otherMember = getOtherMember(members, req.user);

      const { avatar: friendAvatar, name: friendName } = getOtherMember(
        members,
        req.user // user id
      );

      return {
        _id,
        groupChat,
        avatar: groupChat
          ? members.slice(0, 3).map(({ avatar }) => avatar.url)
          : [friendAvatar.url],

        //   : [otherMember.avatar.url],

        name: groupChat ? groupName : friendName,
        members: members.reduce((prev, curr) => {
          if (curr._id.toString() !== req.user.toString()) {
            prev.push(curr._id);
          }
          return prev;
        }, []), // to get just all other members id without requested user id

        // TODO: implement last message view system myself
        // lastMessage,
      };
    }
  );

  return res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

const getMyGroups = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: req.user,
    groupChat: true,
    creator: req.user,
  }).populate("members", "name avatar");

  const groups = chats.map(({ members, _id, groupChat, name }) => ({
    _id,
    groupChat,
    name,
    avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
  }));

  return res.status(200).json({
    success: true,
    groups,
  });
});

const addMembers = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;

  if (!members || members.length < 1)
    return next(new ErrorHandler("Please provide members", 400));

  const chat = await Chat.findById(chatId);

  // if no chat
  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  // if not groupChat
  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));

  // if forbidden
  if (chat.creator.toString() !== req.user.toString())
    return next(new ErrorHandler("You are not allowed to add members", 403));

  const allNewMembersPromise = members.map(
    memberId => User.findById(memberId, "name") // to get just name
  );

  const allNewMembers = await Promise.all(allNewMembersPromise);

  const uniqueMembers = allNewMembers
    .filter(member => !chat.members.includes(member._id.toString()))
    .map(member => member._id);

  // adding the new and unique members in the group
  chat.members.push(...uniqueMembers);

  if (chat.members.length > 100)
    return next(new ErrorHandler("Group members limit reached", 400));

  await chat.save();

  const allUsersName = allNewMembers.map(i => i.name).join(",");

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${allUsersName} has been added in the group`
  );

  emitEvent(req, REFETCH_CHAT, chat.members, `Members added successfully`);

  return res.status(200).json({
    success: true,
    message: "Members added successfully",
  });
});

export { newGroupChat, getMyChat, getMyGroups, addMembers };
