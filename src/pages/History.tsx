import {
  IonContent,
  IonPage,
  IonItemSliding,
  IonItem,
  IonAvatar,
  IonLabel,
  IonList,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonAlert,
  IonImg
} from "@ionic/react";
import * as React from "react";
import { inject, observer } from "mobx-react";
import { MoodStore } from "./MoodService";

import { Emoji } from "emoji-mart";
import { trash } from "ionicons/icons";

type HistoryProps = {
  moodStore: MoodStore;
};

const printDate = (date: Date | string): string => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return date.toLocaleDateString();
};

const History: React.FC<HistoryProps> = ({ moodStore }) => {
  const [removingMoodId, setRemovingMoodId] = React.useState<number>(0);

  return (
    <IonPage>
      <IonAlert
        isOpen={removingMoodId > 0}
        onDidDismiss={() => setRemovingMoodId(0)}
        header={"Remove Mood?"}
        message={"Sure you want to rmeove mood?"}
        buttons={[
          {
            text: "Cencel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => setRemovingMoodId(0)
          },
          {
            text: "Yes",
            handler: () => {
              moodStore.remove(removingMoodId);
              setRemovingMoodId(0);
            }
          }
        ]}
      />

      <IonContent className="ion-padding">
        <h2>Mood History</h2>

        {moodStore.hasNoHistory ? (
          <IonImg src="/assets/empty.svg" />
        ) : (
          <IonList>
            {moodStore.entries.map(mood => (
              <IonItemSliding key={mood.id}>
                <IonItem>
                  <IonAvatar>
                    <Emoji emoji={mood.emoji} size={30} />
                  </IonAvatar>

                  <IonLabel>
                    <h3>{printDate(mood.date)}</h3>
                    <p>{mood.details || "No Details"}</p>
                  </IonLabel>
                </IonItem>{" "}
                <IonItemOptions side="end">
                  <IonItemOption
                    color="danger"
                    onClick={() => setRemovingMoodId(mood.id)}
                  >
                    <IonIcon icon={trash} />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default inject("moodStore")(observer(History));
