<script setup lang="ts">
import SidebarWrapper from './SidebarWrapper.vue'
import { usePopupStore } from '@/stores/popup'
const popup = usePopupStore()
</script>

<template>
  <SidebarWrapper>
    <div class="slots">
      <div class="weapon-select-button" @click="popup.openOtherPopup()">
        <img src="/images/weapon-group/19. Rapier.png" alt="Weapon" />
      </div>
      <div class="item-slot-container">
        <div class="item-slot" id="item-slot-weapon" @click="popup.openItemPopup()">
          <img src="/images/item-icon/Weapon.webp" alt="Weapon" />
        </div>
        <div class="item-slot" id="item-slot-chest" @click="popup.openItemPopup()">
          <img src="/images/item-icon/Chest.webp" alt="Chest" />
        </div>
        <div class="item-slot" id="item-slot-head" @click="popup.openItemPopup()">
          <img src="/images/item-icon/Head.webp" alt="Head" />
        </div>
        <div class="item-slot" id="item-slot-arm" @click="popup.openItemPopup()">
          <img src="/images/item-icon/Arm.webp" alt="Arm" />
        </div>
        <div class="item-slot" id="item-slot-leg" @click="popup.openItemPopup()">
          <img src="/images/item-icon/Leg.webp" alt="Leg" />
        </div>
      </div>
    </div>
  </SidebarWrapper>
</template>

<style>
.weapon-select-button,
.item-slot {
  background-color: var(--bg-duller);
}

.weapon-select-button:hover,
.item-slot:hover {
  background-color: var(--bg-duller-highlighted);
}

.slots {
  width: 22rem;
  display: flex;
  align-items: flex-end;
}

.weapon-select-button {
  flex: 0 0 3rem;
  height: 3rem;
  margin-right: var(--space-medium);
  border-style: hidden;
  border-radius: 0.5rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    width: 1.5rem;
    height: 1.5rem;
  }
}

.item-slot-container {
  width: 18rem;
  display: flex;
  justify-content: space-between;

  .item-slot {
    width: 3rem;
    height: 1.8rem;
    border-style: hidden;
    border-radius: 0.5rem;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    > img {
      height: 0.8rem;
    }
  }
}

.item-icon {
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    font-size: 0.1em;
    color: black;
  }
}
</style>
