/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "CHATTU",
  description = "This is Chat app called CHATTU",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
