import Link from "next/link"
import Image from "next/image"
import {Container, Button, Input, Card, IconButton} from "@material-ui/core"
import {MoreVerticon} from "@mui/icons-material"
// import {Add} from "@material-ui/icons"

import Heading from "../components/UI/Heading"
const Files = () => {
	return (
		<Container className="">
			<Heading className="mt-2" type="sectionHeading">My Files</Heading>
			<Input className="w-48 mb-2" placeholder="Search" />
			<div>
				<Button style={{
					backgroundColor: "#ebe9e4",
					marginBottom: "1rem"
				}} startIcon={<Add/>}
				>
					Blank editor
				</Button>
			</div>
			<div className="flex">
				<Link href="/"><a href="/">
				<Card style={{
					width: "10rem",
					height: "12rem"
				}}>
					<img style={{
						maxWidth: "10rem",
						minHeight: "10rem"
					}} src="/code.png"/>
					
					<div className="flex justify-between items center">
						<p className="text-sm text-gray-800">ml-ops.py</p>
						<IconButton><MoreVerticon/></IconButton>
					</div>
				</Card>
				</a><
				/Link>
			</div>
		</Container>
	)
}

export default Files