import { mergeStyleSets } from "@uifabric/styling";

export const LoginUIClassNames = mergeStyleSets({
  aqueriumTitle: {
    textAlign: "center",
    color: "#1b3e74",
    padding: 10,
    fontSize: 20
  },
  aqueriumInfo: {
    textAlign: "center",
    fontSize: 12,
    color: "#1b3e74",
    transform: "translateY(-60%)"
  },
  patLink: {
    fontSize: "11px"
  }
});
