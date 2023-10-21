<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue'
const areas = [
  { name: '골목길', style: { top: '10%', left: '53%' } },
  { name: '양궁장', style: { top: '25%', left: '22%' } },
  { name: '묘지', style: { top: '61%', left: '66%' } },
  { name: '성당', style: { top: '72%', left: '57%' } },
  { name: '공장', style: { top: '77%', left: '80%' } },
  { name: '소방서', style: { top: '33%', left: '55%' } },
  { name: '숲', style: { top: '58%', left: '37%' } },
  { name: '주유소', style: { top: '15%', left: '40%' } },
  { name: '항구', style: { top: '87%', left: '59%' } },
  { name: '병원', style: { top: '55%', left: '85%' } },
  { name: '호텔', style: { top: '43%', left: '15%' } },
  { name: '연못', style: { top: '45%', left: '65%' } },
  { name: '경찰서', style: { top: '25%', left: '63%' } },
  { name: '학교', style: { top: '34%', left: '35%' } },
  { name: '모래사장', style: { top: '60%', left: '16%' } },
  { name: '개울', style: { top: '40%', left: '80%' } },
  { name: '절', style: { top: '27%', left: '85%' } },
  { name: '고급 주택가', style: { top: '73%', left: '30%' } },
  { name: '창고', style: { top: '83%', left: '45%' } }
]

const polygons = [
  {
    dataName: 'Alley',
    points:
      '308 37 341 5 370 35 395 9 435 50 452 33 536 117 494 158 484 148 480 151 458 129 394 192 316 114 350 79'
  },
  {
    dataName: 'Archery',
    points:
      '99 276 117 258 116 246 100 230 135 196 130 189 158 162 181 184 225 144 216 134 220 132 271 184 216 235 237 254 165 326 135 296 127 304'
  },
  {
    dataName: 'Cemetery',
    points:
      '375 539 468 633 487 614 554 680 630 604 566 540 557 549 461 453 442 472 438 469 422 485 422 493 408 506 403 505 386 522 388 527'
  },
  {
    dataName: 'Church',
    points: '315 649 322 656 362 673 460 771 548 682 485 618 467 636 397 568'
  },
  {
    dataName: 'Factory',
    points:
      '496 741 647 591 657 601 659 599 686 629 679 636 749 705 688 769 670 752 615 808 607 799 588 818 544 774 537 782'
  },
  {
    dataName: 'FireStation',
    points:
      '337 249 394 196 440 242 443 240 480 277 473 284 489 299 468 319 489 340 471 359 475 363 421 417 418 414 418 406 406 393 399 394 383 378 386 375 372 361 376 358 343 326 379 290'
  },
  {
    dataName: 'Forest',
    points:
      '167 500 313 647 395 565 371 541 365 547 343 526 345 521 329 505 322 506 309 492 309 484 293 468 289 473 265 449 276 439 253 416'
  },
  {
    dataName: 'GasStation',
    points: '219 131 242 108 241 105 306 41 346 80 311 115 392 195 336 248'
  },
  {
    dataName: 'Harbor',
    points:
      '334 853 365 823 371 828 397 800 399 802 441 760 460 778 494 744 533 785 446 872 436 862 411 887 365 840 344 862'
  },
  {
    dataName: 'Hospital',
    points: '567 539 636 470 626 459 649 435 670 455 703 423 769 489 661 598 648 585 631 603'
  },
  {
    dataName: 'Hotel',
    points:
      '46 444 90 488 102 476 115 490 121 485 149 513 249 413 135 299 127 307 96 277 54 320 56 323 2 377 12 387 5 394 51 440'
  },
  {
    dataName: 'Pond',
    points:
      '556 544 600 500 549 448 548 404 564 388 505 329 476 359 480 364 425 419 436 431 440 428'
  },
  {
    dataName: 'PoliceStation',
    points:
      '397 193 458 133 480 155 484 152 539 208 545 203 572 230 544 258 571 285 518 339 505 325 492 339 472 319 494 299 479 284 486 278 443 235 440 237'
  },
  {
    dataName: 'School',
    points:
      '166 327 241 253 221 233 269 185 374 291 338 326 371 358 369 359 363 353 342 374 345 379 328 396 322 395 308 408 308 416 291 433 287 428 278 438'
  },
  {
    dataName: 'SandyBeach',
    points:
      '50 452 48 457 52 464 49 469 45 469 37 472 34 489 37 507 46 507 47 519 44 533 58 564 68 572 61 577 61 588 74 596 82 594 82 606 85 612 99 614 104 604 105 609 126 627 126 638 135 647 223 561 166 504 151 518 123 490 118 496 104 482 93 494'
  },
  {
    dataName: 'Stream',
    points:
      '520 341 574 288 598 312 614 297 684 367 685 365 712 393 693 413 699 420 670 450 650 431 621 460 631 470 603 499 551 447 551 404 567 388'
  },
  {
    dataName: 'Temple',
    points:
      '497 161 538 121 542 125 522 144 543 165 555 154 576 176 599 153 624 178 640 162 731 252 718 263 752 295 684 363 613 291 598 307 549 258 576 231 544 199 539 204'
  },
  {
    dataName: 'Uptown',
    points:
      '137 650 163 676 146 693 151 697 150 700 164 715 156 723 179 746 190 736 213 758 223 749 239 765 258 777 320 716 332 728 371 688 361 677 321 660 225 563'
  },
  {
    dataName: 'Warehouse',
    points:
      '261 781 271 788 296 813 297 818 332 851 365 819 370 823 397 795 399 798 439 758 373 691 332 733 321 722'
  }
]

const elementWidth = ref(0)
const elementHeight = ref(0)
const imgElement: Ref<HTMLElement | null> = ref(null)

const elementSize = computed(() => {
  return {
    width: elementWidth.value + 'px',
    height: elementHeight.value + 'px'
  }
})

function resizeElements() {
  if (imgElement.value) {
    elementWidth.value = imgElement.value.offsetWidth
    elementHeight.value = imgElement.value.offsetHeight
  }
}

onMounted(() => {
  window.addEventListener('resize', resizeElements)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeElements)
})
</script>

<template>
  <div class="component">
    <img ref="imgElement" @load="resizeElements()" src="/images/map/map.webp" alt="Lumia Map" />
    <div class="area-container" :style="elementSize">
      <div class="area-name" v-for="(area, index) in areas" :key="index" :style="area.style">
        {{ area.name }}
      </div>
    </div>
    <svg class="area-container" :style="elementSize" viewBox="0 0 772 927">
      <polygon
        v-for="(polygon, index) in polygons"
        :key="index"
        :data-name="polygon.dataName"
        :points="polygon.points"
        tabindex="0"
        role="button"
      />
    </svg>
  </div>
</template>

<style scoped>
.component {
  position: relative;
  width: 100%;
  height: 100%;
}

img {
  width: 100%;
  max-height: 100%;
}

.area-container {
  position: absolute;
  top: 0; /* 이거 지우면 안 겹쳐진다 */
  left: 0;
}

polygon {
  fill: rgba(0, 0, 0, 0);
  outline: none;
}

polygon:hover {
  fill: rgba(255, 255, 255, 0.3);
}

.area-name {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 0.2rem 0.3rem;
  border-radius: 0.3rem;
  position: absolute;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  pointer-events: none;
}
</style>
