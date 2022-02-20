import axios from "axios";

export default function (req, res) {
  const { token, link } = req.body;
  console.log(link);
  axios
    .get(link, {}, { headers: { Authorization: token } })
    .then((res) => {
      // console.log(res.data)
    })
    .catch((err) => {
      // console.log(err)
    });
}
