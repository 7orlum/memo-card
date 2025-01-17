import React from "react";
import { observer } from "mobx-react-lite";
import { DeckFinishedModal } from "./deck-finished-modal.tsx";
import { css } from "@emotion/css";
import { useReviewStore } from "../../store/review-store-context.tsx";
import { random } from "../../lib/array/random.ts";
import { useMount } from "../../lib/react/use-mount.ts";
import { screenStore } from "../../store/screen-store.ts";
import { useMainButton } from "../../lib/telegram/use-main-button.tsx";
import { useTelegramProgress } from "../../lib/telegram/use-telegram-progress.tsx";
import { theme } from "../../ui/theme.tsx";

const encouragingMessages = [
  "Consistency is the key to mastery, and each step you take brings you closer to your learning goals",
  "Remember, the journey of knowledge is endless, and every session counts",
  "Keep up the momentum, and see you in the next review!",
  "While you've made it through all the cards for now, remember that the magic of spaced repetition means you'll see these words pop up in the future.",
  "It's all part of ensuring these nuggets of knowledge stick with you for the long run.",
  "Each review session carves the knowledge deeper into your memory. Well done for pushing through!",
  "Every review strengthens your neural connections. You're not just learning; you're growing!",
  "You're fueling your future self with every review. Imagine where you'll be a year from now!",
  "As the saying goes, 'Repetition is the mother of learning.' You're embracing this wisdom with every session.",
  "Your commitment today is the foundation for mastery tomorrow. Keep it up!",
  "Learning is like building a castle brick by brick. Every review adds another stone to your fortress of knowledge.",
  "Remember, the mightiest of trees grow from constant nurturing. Your knowledge is no different. Keep watering your learning tree!",
  "You're not just revisiting information; you're turning it into a part of who you are. Well done!",
  "Just think of the compounded knowledge you're getting with every review. Your future self thanks you!",
];

type Props = {
  type: "deck" | "repeat_all";
  newCardsCount?: number;
};

export const DeckFinished = observer((props: Props) => {
  const { type, newCardsCount } = props;
  const reviewStore = useReviewStore();

  useMount(() => {
    reviewStore.submitFinished();
  });
  useMainButton("Go back", () => {
    screenStore.go({ type: "main" });
  });
  useTelegramProgress(() => reviewStore.isReviewSending);

  return (
    <DeckFinishedModal marginTop={"32px"}>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        })}
      >
        <p>
          {type === "deck"
            ? `You have finished this deck for now 🎉`
            : `You have repeated all the cards for today 🎉`}
        </p>
        {type === "repeat_all" && newCardsCount && newCardsCount > 1 ? (
          <p>
            Want more? You have{" "}
            <span
              className={css({
                color: theme.linkColor,
              })}
              onClick={() => {
                screenStore.go({ type: "main" });
              }}
            >
              {newCardsCount}
            </span>{" "}
            new cards to study
          </p>
        ) : (
          <p>{random(encouragingMessages)} 😊</p>
        )}
      </div>
    </DeckFinishedModal>
  );
});
