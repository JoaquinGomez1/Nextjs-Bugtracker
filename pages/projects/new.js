import { useState, useEffect, useContext } from "react";
import { ProjectsContext } from "../../context/projects";
import { UserContext } from "../../context/user";
import fetch from "isomorphic-unfetch";
import AddProjectView from "../../components/AddProjectView";
import headers from "../../headers";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const handleAddMember = () => {
    const isMemberNameEmpty = fieldsValue.member ? false : true;
    if (!isMemberNameEmpty) {
      setMembers([...new Set(members), fieldsValue.member]); // Prevent duplicates
      setFieldsValue({
        ...fieldsValue,
        member: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "member") {
      setFieldsValue({
        ...fieldsValue,
        member: parseInt(value),
      });
    } else setFieldsValue({ ...fieldsValue, [name]: value });
  };

  const handleSubmit = async () => {
    const URL = process.env.BACKEND_URL + "/projects";
    const thereAreNoUndefinedValues = Object.values({
      projectName: fieldsValue.projectName,
      projectDescription: fieldsValue.projectDescription,
    }).some((value) => !value);
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

      if (req.status === 200) {
        setProjects([...projects, { res }]);
        router.push("/");
      }
    }
  };

  const removeMemberFromList = (index) => {
    const membersCopy = [...members];
    membersCopy.splice(index, 1);
    setMembers(membersCopy);
  };

  useEffect(() => {
    // Disable 'Add button' if there is no name written
    fieldsValue.member ? setDisableButton(false) : setDisableButton(true);
  }, [fieldsValue]);

  const methods = {
    handleSubmit,
    handleAddMember,
    removeMemberFromList,
    handleChange,
    members,
    disableButton,
    fieldsValue,
  };

  return <AddProjectView actions={methods} />;
}
