import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { calendar, happy } from "ionicons/icons";
import { Provider } from "mobx-react";
import { create } from "mobx-persist";
import Home from "./pages/Home";
import History from "./pages/History";
import { MoodStore } from "./pages/MoodService";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* 3rd Party Styles */
import "emoji-mart/css/emoji-mart.css";

const App: React.FC = () => {
  const hydrate = create({});
  const moodStore = new MoodStore();

  hydrate("moodStore", moodStore);

  return (
    <IonApp>
      <Provider moodStore={moodStore}>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/home" component={Home} exact={true} />
              <Route path="/history" component={History} exact={true} />
              <Route exact path="/" render={() => <Redirect to="/home" />} />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={calendar} />
                <IonLabel>Today</IonLabel>
              </IonTabButton>

              <IonTabButton tab="history" href="/history">
                <IonIcon icon={happy} />
                <IonLabel>History</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </Provider>
    </IonApp>
  );
};

export default App;
