import ColorButton from "./ColorButton";

interface AppProps {
  title: string;
  link: string;
}

export default function App({ title, link }: AppProps) {
  return <ColorButton title={title} link={link} />;
}
