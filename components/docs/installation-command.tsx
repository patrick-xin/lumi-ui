import { highlightCode } from "@/lib/highlight-code";
import { InstallationCommandClient } from "./installation-command.client";

interface InstallationCommandProps {
  __npm__?: string;
  __yarn__?: string;
  __pnpm__?: string;
  __bun__?: string;
  __raw__?: string;
}

export async function InstallationCommand(props: InstallationCommandProps) {
  const [npmHighlighted, yarnHighlighted, pnpmHighlighted, bunHighlighted] =
    await Promise.all([
      props.__npm__
        ? highlightCode(props.__npm__, "bash", { lineNumbers: false })
        : null,
      props.__yarn__
        ? highlightCode(props.__yarn__, "bash", { lineNumbers: false })
        : null,
      props.__pnpm__
        ? highlightCode(props.__pnpm__, "bash", { lineNumbers: false })
        : null,
      props.__bun__
        ? highlightCode(props.__bun__, "bash", { lineNumbers: false })
        : null,
    ]);

  return (
    <InstallationCommandClient
      npm={npmHighlighted}
      yarn={yarnHighlighted}
      pnpm={pnpmHighlighted}
      bun={bunHighlighted}
      npmCode={props.__npm__}
      yarnCode={props.__yarn__}
      pnpmCode={props.__pnpm__}
      bunCode={props.__bun__}
    />
  );
}
