import styles from "./page.module.css";
import { evaluateFlags, flagsClient, getDefinitions } from "@unleash/nextjs";

const getFlag = async () => {

  const definitions = await getDefinitions({
    fetchOptions: {
      next: { revalidate: 15 },
    },
  });

  const { toggles } = evaluateFlags(definitions);

  const flags = flagsClient(toggles);
  const isEnabled = flags.isEnabled("toggle-button");

  // console.log('teste' + isEnabled)
  return isEnabled;
};

export default async function Home() {
  const isEnabled = await getFlag();

  return (
    <div className={styles.page}>
      <p>
        Feature flag is{" "}
        <strong>
          <code>{isEnabled ? "ENABLED" : "DISABLED"}</code>
        </strong>
      </p>
      <button className={styles.button}>{isEnabled ? "ENABLED" : "DISABLED"}</button>
    </div>
  );
}