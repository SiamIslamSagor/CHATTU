import moment from "moment";

const fileFormat = (url = "") => {
  const fileExt = url.split(".").pop();
  //   console.log(fileExt);

  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
    return "video";

  if (
    fileExt === "png" ||
    fileExt === "jpg" ||
    fileExt === "jpeg" ||
    fileExt === "gif"
  )
    return "image";

  if (fileExt === "mp3" || fileExt === "wav") return "audio";

  return "file";
};

const transformImage = (url = "", width = 100) => {
  return url;
};

const getLast7Days = () => {
  const currentDate = moment();

  const last7Days = [];

  // console.log(currentDate.format("MMM D"));
  // console.log(currentDate.subtract(1, "days"));

  for (let i = 0; i < 7; i++) {
    // last7Days.unshift(currentDate.format("MMM D"));
    // currentDate.subtract(1, "days");

    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");

    last7Days.unshift(dayName);
  }

  return last7Days;
};

export { fileFormat, transformImage, getLast7Days };
