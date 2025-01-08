import { gql, useLazyQuery, useQuery } from "@apollo/client";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";

const S = {};
S.wrapper = styled.div`
	width: 100%;
`;
//logo 포함 header
S.header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 50px;
	padding: 5px 10px;
	background-color: #2b2b2b;
`;
// header > logo
S.logo = styled(Link)`
	color: #fff;
	font-size: 2rem;
`;
S.searchForm = styled.form`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	width: 300px;
	height: 30px;
	border: 1px solid red;
	& > input[type="text"] {
		width: 260px;
	}
	& > input[type="submit"] {
		width: 40px;
	}
`;
S.searhContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 1000px;
	height: 500px;
	margin: 200px auto 0;
	background-color: #2b2b2b;
	& > ${S.searchForm} {
	}
`;

const GET_puuid = gql`
	query getPuuidByRiotId($input: getPuuidByRiotIdInput!) {
		getPuuidByRiotId(input: $input) {
			ok
			error
			summoner {
				puuid
				name
				tag
			}
		}
	}
`;

function Main() {
	const [getSummoner, { loading, error, data }] = useLazyQuery(GET_puuid);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	return (
		<>
			<S.wrapper>
				{/* header 시작 */}
				<S.header>
					<S.logo to={"/"}>Tier Note</S.logo>
				</S.header>
				{/* header 끝 */}
				{/* search bar 시작 */}
				<S.searhContainer>
					<S.searchForm
						onSubmit={handleSubmit(async (data) => {
							console.log("onsubmit action complete");
							const [name, tag] = data.riotId.split("#");
							console.log(name + "+" + tag);
							await getSummoner({
								variables: {
									input: {
										name,
										tag,
									},
								},
							}).then((data) =>
								console.log(data.data.getPuuidByRiotId.summoner.puuid)
							);
						})}
					>
						<input type="text" {...register("riotId")} />
						<input type="submit" value="전송" />
					</S.searchForm>
				</S.searhContainer>
			</S.wrapper>
		</>
	);
}

export default Main;
