import { mergeStyleSets } from "@uifabric/styling";

export const LoginUIClassNames = mergeStyleSets({
  root: {
    height: "100%"
  },
  aqueriumTitle: {
    textAlign: "center",
    position: "absolute",
    color: "#1b3e74",
    padding: 10,
    fontSize: 20,
    top: 120
  },
  aqueriumInfo: {
    textAlign: "center",
    position: "absolute",
    fontSize: 12,
    color: "#1b3e74",
    top: 200
  },
  patLink: {
    fontSize: "11px",
    position: "absolute",
    bottom: 13
  },
  spinner: {
    textAlign: "center",
    top: 400,
    color: "#004d7c"
  },
  loginFields: {
    position: "absolute",
    top: 250
  },
  logo: {
    position: "absolute",
    top: 40
  }
});
