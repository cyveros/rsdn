
export default class Store {

    private length: number;
    private items: any;
    private name: string;
    private lastAddedKey: string;

    constructor(name?: string) {
        this.length = 0;
        this.name = name || 'store';
        this.items = {};
        this.lastAddedKey = null;
    }

    public get(target: string): boolean | any {
        if (!this.has(target)) {
            return false;
        }

        return this.items[target];
    }

    public getAll(): any {
        return this.items;
    }

    public getLastIn(): boolean | any {
        return this.get(this.lastAddedKey);
    }

    public has(target: string): boolean {
        return this.items.hasOwnProperty(target);
    }

    public set(target: string, value: any, filter?: (v: any) => any): Store {
        if (!this.has(target)) {
            this.length += 1;
        }

        this.items[target] = filter === undefined ? value : filter(value);
        this.lastAddedKey = target;

        return this;
    }

    public push(value: any): Store {
        return this.set(this.uuid(), value);
    }

    public remove(target: string): Store {
        if (this.has(target)) {
            delete this.items[target];
        }

        return this;
    }

    public keys(): string[] {
        let keys: string[] = [];

        for (var k in this.items) {
            if (this.has(<string>k)) {
                keys.push(k);
            }
        }
        
        return keys;
    }

    public values(): any[] {
        var values = [];
        for (var k in this.items) {
            if (this.has(<string>k)) {
                values.push(this.items[k]);
            }
        }
        
        return values;
    }

    public each(fn: (v: any, k?: string) => any): Store {
        for (var k in this.items) {
            if (this.has(<string>k)) {
                fn(this.items[k], <string>k);
            }
        }

        return this;
    }

    public clear() {
        this.items = {};
        this.length = 0;

        return this;
    }

    public getName(): string {
        return this.name;
    }

    protected uuid(): string {
         // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        return s.join("");
    }
}



