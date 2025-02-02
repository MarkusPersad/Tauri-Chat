<template>
    <div class="navbar bg-blue-500 shadow-sm">
        <div class="navbar-start">
            <slot name="start"></slot>
        </div>
        <div class="navbar-center">
            <slot name="center"></slot>
        </div>
        <div class="navbar-end">
            <div class="space-x-4 flex">
                <slot name="end"></slot>
            </div>
        </div>
    </div>
</template>
