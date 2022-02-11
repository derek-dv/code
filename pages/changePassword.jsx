import { Container } from "@material-ui/core";
function ChangePassword() {
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
          link there to change your password.
        </p>
      </div>
    </Container>
  );
}
export default ChangePassword;
