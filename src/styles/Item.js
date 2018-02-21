import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 5,
    margin: 4,
    borderWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: "#fff"
  },
  item: {
    flex: 1,
    flexDirection: "row"
  },
  img: {
    padding: 0,
    width: 60,
    height: 60
  },
  details: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    marginLeft: 5,
    paddingRight: 5
  },
  detailsHead: {
    fontWeight: "bold"
  },
  progress: {
    height: 1,
    backgroundColor: "#111"
  }
});
