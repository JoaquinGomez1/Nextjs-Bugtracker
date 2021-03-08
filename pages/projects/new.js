import { useState, useContext } from "react";
import { ProjectsContext } from "../../context/projects";
import { UserContext } from "../../context/user";
import fetch from "isomorphic-unfetch";
import AddProjectView from "../../components/AddProjectView";
import headers from "../../headers";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { fadeIn } from "../../libs/animations";

let timeout;

const removeDuplicates = (arr) => {
  const seen = new Set();

  const filteredArr = arr.filter((el) => {
    const duplicate = seen.has(el.id);
    seen.add(el.id);
    return !duplicate;
  });
  return filteredArr;
};

export default function NewProject() {
  const { projects, setProjects } = useContext(ProjectsContext);
  const { currentUser } = useContext(UserContext);
  const [members, setMembers] = useState([]);
  const [possibleMembers, setPossibleMembers] = useState([]);
  const [fieldsValue, setFieldsValue] = useState({
    projectName: "",
    projectDescription: "",
    member: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "projectName") {
      if (value.length < 35) setFieldsValue({ ...fieldsValue, [name]: value });
    } else setFieldsValue({ ...fieldsValue, [name]: value });

    if (name === "member") handleMemberRequest();
  };

  const handleSubmit = async () => {
    const URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/projects";
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
        members: members.map((each) => each.id),
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

  const handleMemberRequest = () => {
    const timeoutTime = 1200;
    setPossibleMembers([]);

    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      const URL =
        process.env.NEXT_PUBLIC_BACKEND_URL +
        "/user?name=" +
        fieldsValue.member;

      const req = await fetch(URL);
      const res = await req.json();

      if (req.status === 200) {
        setPossibleMembers(res);
      }
    }, [timeoutTime]);
  };

  const onMemberClicked = (item) => {
    setPossibleMembers([]);
    setMembers(removeDuplicates([...members, item]));
    setFieldsValue({ ...fieldsValue, member: "" });
  };

  const lostOfFocus = () => {
    // Give the user a few miliseconds to allow him/her to click .
    setTimeout(() => {
      setPossibleMembers([]);
    }, 200);
  };

  const methods = {
    handleSubmit,
    removeMemberFromList,
    handleChange,
    members,
    fieldsValue,
    possibleMembers,
    onMemberClicked,
    lostOfFocus,
  };

  return (
    <motion.div
      variants={fadeIn}
      style={{ transformOrigin: "top" }}
      animate="show"
      initial="hidden"
    >
      <AddProjectView actions={methods} />
    </motion.div>
  );
}
