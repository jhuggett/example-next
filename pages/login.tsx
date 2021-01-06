import { useCMS } from "tinacms";

export default function Login(props) {
  const cms = useCMS();

  return (<>
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? "Exit Edit Mode" : "Edit This Site"}
    </button>
    {props.preview && <p>You are logged in to Tina.io. Return to <a href="/">homepage</a></p> }
  </>);
}

export const getStaticProps = async (props: {preview: boolean, previewData: { tinaio_token: string}}) => {
  return {
    props: {
    preview: !!props.preview
  }}
};