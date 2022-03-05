import { Container, Button } from "@material-ui/core";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import Heading from "../components/UI/Heading";

export async function getStaticProps({ locale }) {
  return {
    props: { ...(await serverSideTranslations(locale, ["home", "public"])) },
  };
}

export default function Home({ user }) {
  const {t} = useTranslation();
  const buttonStyle = {
    backgroundColor: "blue",
    padding: "0.5rem 2rem",
    marginRight: "1rem",
  };
  return (
    <Container>
      <div style={{ marginTop: "5rem" }} className="flex flex-wrap gap-5">
        <div>
          <img src="/type.svg" />
        </div>
        <div className="flex-auto">
          <Heading type="mainHeading">{t("home:title")}</Heading>
          <p>{t("home:subtitle")}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {user ? (
              <>
                <Button style={buttonStyle}>
                  <Link href="/myfiles">
                    <a className="text-white">{t("home:myfiles")}</a>
                  </Link>
                </Button>
                <Button style={buttonStyle}>
                  <Link href="/profile">
                    <a className="text-white">{t("home:profile")}</a>
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button style={buttonStyle}>
                  <Link href="/file/new">
                    <a className="text-white">{t("home:started")}</a>
                  </Link>
                </Button>
                <Button style={buttonStyle}>
                  <Link href="/signup">
                    <a className="text-white">{t("home:register")}</a>
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
