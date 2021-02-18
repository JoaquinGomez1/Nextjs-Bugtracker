import { useState, useEffect, useContext } from "react";
import { ProjectsContext } from "../../context/projects";
import { UserContext } from "../../context/user";
import fetch from "isomorphic-unfetch";
import AddProjectView from "../../components/AddProjectView";
import headers from "../../headers";

export default function NewProject() {
  const { projects, setProjects } = useContext(ProjectsContext);
  const { currentUser } = useContext(UserContext);
  const [members, setMembers] = useState([]);
  const [fieldsValue, setFieldsValue] = useState({
    projectName: "",
    projectDescription: "",
    member: { id: Math.random(), name: "" },
  });
  const [disableButton, setDisableButton] = useState(true);

  const handleAddMember = () => {
    const isMemberNameEmpty = fieldsValue.member.name ? false : true;
    if (!isMemberNameEmpty) {
      setMembers([...members, fieldsValue.member]);
      setFieldsValue({
        ...fieldsValue,
        member: { id: Math.random(), name: "" },
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "member") {
      setFieldsValue({
        ...fieldsValue,
        member: { id: fieldsValue.member.id, name: value },
      });
    } else setFieldsValue({ ...fieldsValue, [name]: value });
  };

  const handleSubmit = async () => {
    console.log("handle submit");
    const URL = process.env.BACKEND_URL + "/projects";
    const thereAreNoUndefinedValues = Object.values(fieldsValue).some(
      (value) => !value
    );
    const thereAreMembers = members.length >= 1;

    if (!thereAreNoUndefinedValues && thereAreMembers) {
      const data = {
        owner: currentUser.id,
        name: fieldsValue.projectName,
        description: fieldsValue.projectDescription,
        members,
      };

      const reqHeaders = headers;
      reqHeaders.method = "PUT";
      reqHeaders.body = JSON.stringify(data);

      const req = await fetch(URL, reqHeaders);
      const res = await req.json();

      if (req.status === 200) setProjects([...projects, { res }]);
    }
  };

  useEffect(() => {
    // Disable 'Add button' if there is no name written
    fieldsValue.member.name ? setDisableButton(false) : setDisableButton(true);
  }, [fieldsValue]);

  const methods = {
    handleSubmit,
    handleAddMember,
    handleChange,
    members,
    disableButton,
    fieldsValue,
  };

  return <AddProjectView actions={methods} />;
}
