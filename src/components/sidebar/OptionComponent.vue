<script setup lang="ts">
import SidebarWrapper from './SidebarWrapper.vue';
</script>

<template>
  <SidebarWrapper>
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
  </SidebarWrapper>
</template>

<style>
.route-select-container {
  width: 24rem;
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
}
</style>
