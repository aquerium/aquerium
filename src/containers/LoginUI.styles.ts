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
    fontSize: 30,
    top: 120
  },
  aqueriumInfo: {
    textAlign: "center",
    position: "absolute",
    fontSize: 20,
    color: "#1b3e74",
    top: 200,
    padding: 10
  },
  patLink: {
    fontSize: "16px",
    position: "absolute",
    bottom: 30
  },
  loginFields: {
    position: "absolute",
    top: 330
  },
  logo: {
    position: "absolute",
    top: 40
  }
});
