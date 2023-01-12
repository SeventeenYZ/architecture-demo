const $storage = localStorage

/**
 * 根据 key 值向 storage 中储存值
 * @param key storage key
 * @param value 需要储存在 storage 中的值
 */
export const setStorage = <T>(key: string, value: T) => $storage.setItem(key, typeof value !== 'string' ? JSON.stringify(value) : value);

/**
 * 根据 key 值获取储存在 storage 中的值
 * @param key storage key
 */
export const getStorage = <T>(key: string) => {
    let value = $storage.getItem(key) || '';
    try {
        value = JSON.parse(value);
        return value;
    } catch {
        return value;
    }
};

/**
 * 根据 key 值移除储存在 storage 中的值
 * @param key storage key
 */
export const removeStorage = (key: string) => $storage.removeItem(key);

/**
 * 移除所有储存在 storage 中的值
 */
export const clearAllStorage = (): void => {
    for (const itemKey in $storage) {
        if (itemKey) {
            $storage.removeItem(itemKey);
        }
    }
};
