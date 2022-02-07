import { Container, Button, Input, Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CustomInput from "../components/formInput";
import Heading from "../components/UI/Heading";

export default function ({ user, setAlert }) {
  const router = useRouter();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/profile/${user._id}`)
        .then((res) => {
          setProfile(res.data);
          setError(false);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
        });
    }
    else{
      setAlert('You have to be logged in!')
      router.push('/login')
    }
  }, []);

  const submit = (e) => {
    console.log(e);
  };

  const profileForm = (
    <div
      style={{ padding: "10rem 0" }}
      className="flex items-center justify-center flex-col"
    >
      <Paper className="p-4 pt-0 w-full lg:w-96">
        <Heading type="sectionHeading">Create profile</Heading>
        <form onSubmit={submit} autoComplete="off">
          <div className="w-full my-3">
            <CustomInput label="First Name" setValue={setFirstName} />
          </div>

          <div className="w-full my-3">
            <CustomInput label="Last Name" setValue={setLastName} />
          </div>

          <div className="w-full my-3">
            <CustomInput label="Description" setValue={setDescription} />
          </div>

          <div className="w-full my-3">
            <CustomInput label="Address" setValue={setAddress} />
          </div>

          <div className="w-full my-3">
            <CustomInput label="City" setValue={setCity} />
          </div>

          <div className="w-full my-3">
            <CustomInput label="Country" setValue={setCountry} />
          </div>

          <Button
            style={{ backgroundColor: "blue", padding: "0.5rem 1rem" }}
            className="text-white text-bold"
            type="submit"
          >
            Send Reset Link
          </Button>
        </form>
      </Paper>
    </div>
  );

  const profilePage = (
    <>
      <h2 className="profile-heading font-bold text-lg">Profile page</h2>
      <div className="profile-main">
        <div className="profile-info">
          <div className="profile-img">
            <img src="/code.png" />
          </div>
          <div className="profile-personal">
            <h2 className="profile-name font-bold">John Doe</h2>
            <p className="profile-address text-gray-400">New York, USA</p>
            <p className="profile-description">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis ut
              veritatis possimus commodi fuga quisquam? Beatae nesciunt aut quos
              tempora.
            </p>
            <Button
              style={{
                backgroundColor: "blue",
              }}
            >
              Edit profile
            </Button>
          </div>
        </div>
      </div>

      <div className="profile-details">
        <div className="files-summary">
          <h3>Files Uploaded</h3>
          <p>23 files Uploaded by user</p>
        </div>

        <div className="profile-section">
          <h3 className="font-bold">Personal Information</h3>
          <div className="profile-item">
            <label>Name</label>
            <Input value={"John Doe"} disabled label="name" />
          </div>
          <div className="profile-item">
            <label>Email</label>
            <Input value={"john@test.com"} disabled label="Email" />
          </div>
          <div className="profile-item">
            <label>Address</label>
            <Input value={"123 test street"} disabled label="Address" />
          </div>
          <div className="profile-item">
            <label>City</label>
            <Input value={"New York"} disabled label="City" />
          </div>
          <div className="profile-item">
            <label>Country</label>
            <Input value={"USA"} disabled label="Country" />
          </div>
        </div>
      </div>
    </>
  );
  return <Container className="mt-5">{profileForm}</Container>;
}
