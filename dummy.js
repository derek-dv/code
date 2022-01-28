export const files = [
  {
    id: 1,
    name: "com.js",
    language: "javascript",
    code: `import Link from "next/link";
        import Image from "next/image";
        import { Container, Button, Input, Card, IconButton } from "@material-ui/core";
        import { MoreVerticon } from "@mui/icons-material";
        import { Add } from "@material-ui/icons";
        
        import Heading from "../components/UI/Heading";
        const Files = () => {}}`,
  },
  {
    id: 2,
    name: "script.js",
    language: "javascript",
    code: `const Login = () => {
            const form = useForm({
            resolver: yupResolver(loginSchema),
          });}`,
  },
  {
    id: 3,
    name: "default.css",
    language: "CSS",
    code: `@tailwind base;
        @tailwind components;
        @tailwind utilities;
        
        .button-left {
            align-items: flex-start !important;
            justify-content: flex-start !important;
        }
        
        `,
  },
];
