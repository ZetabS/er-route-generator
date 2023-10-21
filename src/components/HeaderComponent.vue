<script setup lang="ts"></script>

<template>
  <header>
    <nav>
      <ul>
        <li><a href="#">이터널 리턴 루트 생성기</a></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  background-color: var(--bg-duller);
  grid-area: header;
  text-align: left;
  display: flex;
  align-items: center;
}

nav {
  margin-left: var(--space-medium);
  width: 100%;
  text-align: left;
}

nav ul {
  list-style-type: none;
}

nav ul li {
  display: inline;
}

nav a {
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
}
</style>
