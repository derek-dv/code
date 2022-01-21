import Link from "next/link";
import Head from "next/head";
import {Container, Button} from "@material-ui/core"

// Components
// import Container from "../components/UI/Container";
import Heading from "../components/UI/Heading";

//
import { Add, EditFile, IdCard, User } from "../components/icons";

const Home = () => {
  const buttons = [
    {
      id: "new-file",
      text: "New File",
      link: "/file/new",
      colorClasses: "bg-blue-400 hover:bg-blue-500 border-blue-500 ",
      textClasses: "text-white",
      onClick: () => {},
      icon: Add,
    },
    {
      id: "manage-files",
      text: "Manage Files",
      link: "/myfiles",
      colorClasses: "bg-green-500 hover:bg-green-600 border-green-600 ",
      textClasses: "text-white",
      onClick: () => {},
      icon: EditFile,
    },{
      id: "profile",
      text: "Profile",
      link: "/profile",
      colorClasses: "bg-red-400 hover:bg-red-500 border-red-500 ",
      textClasses: "text-white",
      onClick: () => {},
      icon: IdCard,
    },
    {
      id: "sign-up",
      text: "Log out",
      link: "/signup",
      colorClasses: "bg-yellow-400 hover:bg-yellow-500 border-yellow-500 ",
      textClasses: "text-white",
      onClick: () => {},
      icon: User,
    },
    
  ];

  return (
    <>
      <Head>
        <title>Home | Code Sharing Application</title>
      </Head>
      <Container>
        <div className="py-24 flex flex-col lg:flex-row">
          <div className="w-full lg:w-7/12 mb-8 lg:mb-0">
            <div className="flex items-center justify-center lg:justify-start">
              <img src="/type.svg" className="w-9/12" />
            </div>
          </div>
          <div className="w-full lg:w-5/12">
            <Heading className="mb-6">Code sharing application</Heading>
            <div className="grid grid-cols-2 gap-3">
              {buttons.map((btn) => {
                const Icon = btn.icon;

                return (
                  <Link href={btn.link} key={btn.id}>
                    <Button>
                      <div
                        className={`px-4 py-3 m-0 w-full h-full rounded-lg overflow-hidden border cursor-pointer ${btn.colorClasses}`}
                        onClick={btn.onClick}
                      >
                        <div className="flex items-center">
                          <div className="mr-2">
                            <Icon size={1.8} color="#fff" />
                          </div>
                          <Heading type="sectionHeading">
                            <span className={btn.textClasses}>{btn.text}</span>
                          </Heading>
                        </div>
                      </div>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
