import { writable, type Writable } from 'svelte/store';
import type { ToastMetaType } from '../types/toast.types';

export const toast_store: Writable<ToastMetaType[]> = writable([]);
