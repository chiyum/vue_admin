<template>
  <div class="card-page">
    <h3>{{ t("pages.card.slot.row.title") }}</h3>
    <div class="global-grid global-grid-two">
      <div class="card-item">
        <normal-card custom-class="h-full" :title="t('pages.card.slot.title')">
          <div class="form-row-item">
            <p>
              {{ t("pages.card.slot.title") }}
            </p>
            <p>
              {{ t("pages.card.slot.text") }}
            </p>
          </div>
        </normal-card>
      </div>
      <div class="card-item">
        <normal-card
          use-action
          :title="t('pages.card.slot.action.title')"
          @confirm="notify('confirm')"
          @cancel="notify('cancel', 'negative')"
        >
          <div class="form-row-item">
            <p>
              {{ t("pages.card.slot.action.text") }}
            </p>
          </div>
        </normal-card>
      </div>
    </div>
    <h3>{{ t("pages.card.img.title") }}</h3>
    <div class="global-grid global-grid-three">
      <img-card
        :title="imgCardProps.title"
        :tip="imgCardProps.tip"
        :text="imgCardProps.text"
        :src="imgCardProps.src"
      ></img-card>
      <normal-card :title="t('pages.card.img.vertical.title')">
        <p class="mb-4">{{ t("pages.card.img.vertical.text") }}</p>
        <img-card2 :src="imgCar2Props.src">
          <q-btn flat round color="red" icon="favorite" />
          <q-btn flat round color="accent" icon="bookmark" />
          <q-btn flat round color="primary" icon="share" />
        </img-card2>
      </normal-card>
      <img-user-card
        :action-btn-text="userCardProps.actionBtnText"
        :title="userCardProps.title"
        :text="userCardProps.text"
        :bg-src="userCardProps.bgSrc"
        :photo-src="userCardProps.photoSrc"
      ></img-user-card>
    </div>
  </div>
</template>
<script setup>
import normalCard from "@/widgets/ui/normal-card.vue";
import imgCard from "@/widgets/ui/img-card.vue";
import imgCard2 from "@/widgets/ui/img-vertical-action.vue";
import imgUserCard from "@/widgets/ui/user-card.vue";
import { useI18n } from "@/services/i18n-service.js";
import { useQuasar } from "quasar";
import getImageUrl from "@/utils/getImageUrl.js";
const $q = useQuasar();
const { t } = useI18n();
const notify = (message, color = "primary") => {
  $q.notify({
    message: message,
    color: color,
    position: "center",
    timeout: 1000,
  });
};
const imgCardProps = {
  title: "Card title",
  tip: "Tip",
  text:
    "Some quick example text to build on the card title and make up the bulk of the card's content.",
  src: getImageUrl("_.jpg"),
};
const imgCar2Props = {
  src: getImageUrl("2.jpg"),
};

const userCardProps = {
  title: t("pages.card.img.user.title"),
  text: t("pages.card.img.user.text"),
  src: getImageUrl("2.jpg"),
  actionBtnText: t("pages.card.img.user.follow"),
  bgSrc: getImageUrl("5.jpg"),
  photoSrc: getImageUrl("_.jpg"),
};
</script>
<style lang="scss">
.card-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
