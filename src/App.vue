<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'

import MapComponent from './components/MapComponent.vue'
</script>

<template>
  <header>
    <nav>
      <ul>
        <li><a href="#">이터널 리턴 루트 생성기</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <div class="main-container side">
      <div class="side-component select-item">
        <div class="slot-container">
          <div class="weapon-select-button">
            <!--suppress HtmlUnknownTarget -->
            <img src="/images/weapon-group/19. Rapier.png" alt="Weapon" />
          </div>
          <div class="item-slot-container">
            <div class="item-slot" id="item-slot-weapon" onclick="openItemPopup(this)">
              <!--suppress HtmlUnknownTarget -->
              <img src="/images/item-icon/Weapon.webp" alt="Weapon" />
            </div>
            <div class="item-slot" id="item-slot-chest" onclick="openItemPopup(this)">
              <!--suppress HtmlUnknownTarget -->
              <img src="/images/item-icon/Chest.webp" alt="Chest" />
            </div>
            <div class="item-slot" id="item-slot-head" onclick="openItemPopup(this)">
              <!--suppress HtmlUnknownTarget -->
              <img src="/images/item-icon/Head.webp" alt="Head" />
            </div>
            <div class="item-slot" id="item-slot-arm" onclick="openItemPopup(this)">
              <!--suppress HtmlUnknownTarget -->
              <img src="/images/item-icon/Arm.webp" alt="Arm" />
            </div>
            <div class="item-slot" id="item-slot-leg" onclick="openItemPopup(this)">
              <!--suppress HtmlUnknownTarget -->
              <img src="/images/item-icon/Leg.webp" alt="Leg" />
            </div>
          </div>
        </div>
      </div>
      <div class="side-component option">
        <div class="route-select-container">
          <label for="route-dropdown-1"></label>
          <select class="route-dropdown" id="route-dropdown-1" name="dropdown">
            <option value="none">루트1</option>
            <option value="option1">병원</option>
            <option value="option2">고급 주택가</option>
          </select>
          <label for="route-dropdown-2"></label>
          <select class="route-dropdown" id="route-dropdown-2" name="dropdown">
            <option value="none">루트2</option>
            <option value="option1">병원</option>
            <option value="option2">고급 주택가</option>
          </select>
          <label for="route-dropdown-3"></label>
          <select class="route-dropdown" id="route-dropdown-3" name="dropdown">
            <option value="none">루트3</option>
            <option value="option1">병원</option>
            <option value="option2">고급 주택가</option>
          </select>
          <label for="route-dropdown-4"></label>
          <select class="route-dropdown" id="route-dropdown-4" name="dropdown">
            <option value="none">루트4</option>
            <option value="option1">병원</option>
            <option value="option2">고급 주택가</option>
          </select>
        </div>

        <div class="checkbox-group">
          <label> <input type="checkbox" name="option1" value="Option 1" /> 루트1 </label>
          <label> <input type="checkbox" name="option2" value="Option 2" /> 옵션 2 </label>
          <label> <input type="checkbox" name="option3" value="Option 3" /> 옵션 3 </label>
        </div>
      </div>
    </div>

    <div class="main-container center">
      <MapComponent />
    </div>

    <div class="main-container side">
      <div class="side-component test1">test1</div>
      <div class="side-component test2">test2</div>
      <div class="side-component test3">test3</div>
    </div>

    <div class="popup-container" id="popup-container">
      <div class="popup-background" id="popup-background" onclick="closePopup()"></div>
      <!-- 팝업 내용 -->
      <div class="popup" id="popup-item">
        <div class="close-button" onclick="closePopup()">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path class="close-icon" d="M12 0L0 12M0 0L12 12" />
          </svg>
        </div>
        <h2>목표 아이템</h2>
        <div class="item-button-container"></div>
      </div>
    </div>
  </main>
  <footer>
    <p>
      &copy; 2023 Zetab_S. Eternal Return and all related logos are trademarks of Nimble Neuron,
      inc. or its affiliates.
    </p>
  </footer>
</template>

<style scoped>
header {
  text-align: left;
  padding: 0.6rem;
}

nav {
  width: 100%;
  text-align: left;
}

nav ul {
  list-style-type: none;
}

nav ul li {
  display: inline;
  margin-right: 20px;
}

nav a {
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
}
</style>
