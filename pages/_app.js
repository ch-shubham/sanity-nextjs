import { library, config } from "@fortawesome/fontawesome-svg-core";
import {
  faBorderAll,
  faListUl,
  faSortNumericDown,
  faSortNumericUp,
} from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false; // performance boost. It stops importing automatic css files as we are doing it below
library.add(faListUl, faBorderAll, faSortNumericDown, faSortNumericUp);

import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "highlight.js/styles/darcula.css";
import "styles/index.scss";
import ThemeProvider from "providers/ThemeProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
