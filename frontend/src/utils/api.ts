export interface Menu {
    id: number;
    depth: number;
    name: string;
    slug: string;
    parent?: Menu;
    parent_id: number;
    childrens?: Menu[];
}

export interface MutateMenu {
    id?: number;
    name: string;
    parent_id?: number;
}

const url = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? 'http://localhost:8000/api';

export async function getListMenu(): Promise<Array<Menu>> {
    const res = await fetch(`${url}/menus`);

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    return await json.data;
}

export async function getParentMenu(id: number): Promise<Menu> {
    const res = await fetch(`${url}/menus/${id}`);

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    return await json.data;
}

export async function getDetailByUrl(slug: string): Promise<Menu> {
    const res = await fetch(`${url}/menu-by-url?slug=${slug.replace('/', '')}`);

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    return await json.data;
}

export async function createMenu({
    name,
    parent_id
} : MutateMenu): Promise<Menu> {
    const res = await fetch(`${url}/menus`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            parent_id: parent_id ?? null,
        })
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    return await json.data;
}

export async function editMenu({
    id,
    name,
    parent_id
} : MutateMenu): Promise<Menu> {
    const res = await fetch(`${url}/menus/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            parent_id: parent_id ?? null,
        })
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    return await json.data;
}

export async function deleteMenu(id: number): Promise<{message: string}> {
    const res = await fetch(`${url}/menus/${id}`, {
        method: 'DELETE'
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    return await json;
}
