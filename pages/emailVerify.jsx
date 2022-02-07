import { Container } from "@material-ui/core";
function EmailVerify() {
  return (
    <Container>
      <div
        className="h-full my-auto"
        style={{
          display: "grid",
          placeItems: "center",
          height: "100%",
          padding: "10rem 0",
        }}
      >
        <p className="text-lg">
          An email has been sent to the Email address you provided. Click on the
          link there to verify your account.
        </p>
      </div>
    </Container>
  );
}
export default EmailVerify;
