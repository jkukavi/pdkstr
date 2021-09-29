import useScreenSize from "./useScreenSize";

import SmallScreenForm from "./SmallScreenForm";
import WideScreenForm from "./WideScreenForm";

const Form = (props) => {
  const smallScreen = useScreenSize();
  const Form = smallScreen ? SmallScreenForm : WideScreenForm;
  return <Form {...props} />;
};

export default Form;
