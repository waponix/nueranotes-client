<template>
    <section class="flex w-full h-full flex-col">
        <header id="header" class="flex-initial flex w-full bg-normal">
            <slot name="header"></slot>
        </header>
        <div class="flex-1 flex w-full">
            <slot name="left-content"></slot>
            <slot name="right-content"></slot>
        </div>
    </section>
</template>