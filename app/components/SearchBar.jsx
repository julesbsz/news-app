import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useRef, useContext } from "react";
import { SearchBar } from "@rneui/themed";
import { NewsContext } from "../context/NewsContext";

const SearchBarComponent = ({ search, setSearch }) => {
	const { getNewsBySearch, getLatestNews, loading } = useContext(NewsContext);

	const [prevSearch, setPrevSearch] = React.useState("");
	const timerRef = useRef(null);

	const updateSearch = (search) => {
		setSearch(search);
	};

	useEffect(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		timerRef.current = setTimeout(() => {
			if (search === "") {
				if (prevSearch === "") return;
				getLatestNews();
			} else {
				setPrevSearch(search);
				getNewsBySearch(search);
			}
		}, 500);

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [search]);

	return <SearchBar showLoading={loading} leftIconContainerStyle={styles.icon} containerStyle={styles.container} round={true} placeholder="Search a news..." onChangeText={updateSearch} value={search} />;
};

export default SearchBarComponent;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#111111",
		borderColor: "#111111",
		paddingLeft: 20,
		paddingRight: 20,
	},
	icon: {
		paddingLeft: 10,
	},
});
