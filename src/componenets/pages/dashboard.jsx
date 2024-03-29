import React, { useEffect } from "react";
import Navbar from "../common/navbar";
import Header from "../common/header";
import Footer from "../common/footer";
import { useLazyGetPermissionsQuery } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
	setPermissionChecked,
	setPermissions,
} from "../../redux/reducers/auth";
import UserHeader from "../common/UserHeader";
import AssigneeHeader from "../common/AssigneeHeader";

const Dashboard = () => {
	const user = useSelector((state) => state.authReducer.activeUser);

	const { activeUser, permissions, permissionChecked } = useSelector(
		(state) => state.authReducer
	);
	const [trigger] = useLazyGetPermissionsQuery();

	const dispatch = useDispatch();

	useEffect(() => {
		if (!permissionChecked) {
			trigger(activeUser._id)
				.then((res) => {
					console.log(res.data);
					dispatch(setPermissions(res.data));
					dispatch(setPermissionChecked(true));
				})
				.catch((err) => toast.error(err.message));
		}
	}, []);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<Navbar />
			{JSON.stringify(user.role, null, 4)}
			{user.role == "user" ? (
				<UserHeader />
			) : user.role == "dept-manager" ? (
				<Header />
			) : (
				<AssigneeHeader />
			)}
			<div style={{ flexGrow: 1 }}>{/* Your main content here */}</div>
			<Footer
				style={{
					flexShrink: 0,
					position: "fixed",
					left: 0,
					bottom: 0,
					width: "100%",
				}}
			/>
		</div>
	);
};

export default Dashboard;
