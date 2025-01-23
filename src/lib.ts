const TODO = () => {
    throw Error('Not yet implemented!');
};

const _START = Date.now();
const _TIMEOUT = 5000;
const _END = _START + _TIMEOUT;

const JSF = (seed: number) => TODO();
const LCG = (seed: number) => TODO();

const add_time = (date: Date, offset: number): Date =>
    new Date(date.getTime() + offset);

const are_ids_eq = (id1, id2) => TODO();

type Context = {
    caller: string,
    calling_script: string | null,
    this_script: string,
    cols: number,
    rows: number,
};

type ScriptReturn = {
    ok: boolean,
    msg: string,
};

const caller_is_owner = (context: Context) =>
    context.this_script.split('.')[0] == context.caller;

const can_continue_execution = (remain_threshold: number): boolean =>
    Date.now() < (_END - remain_threshold);

const can_continue_execution_error = (remain_threshold: number, name: string): ScriptReturn | null => {
    if (can_continue_execution(remain_threshold)) return null;

    return {
        ok: false,
        msg: `${name} could not continue executing because ${remain_threshold}ms are not available for execution.`,
    };
};

const cap_str_len = (str: string, length: number): string =>
    str.substring(0, length);

const clamp = (value: number, min: number, max: number): number =>
    Math.min(max, Math.max(min, value));

function clone<T>(t: T): T {
    return JSON.parse(JSON.stringify(t));
}

const colors: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const columnize = (strings: string[]): string => TODO();

const corrupt = (str: string, corruption: number) => TODO();

const corruption_chars = '¡¢Á¤Ã¦§¨©ª';
const corruptions = [ 0, 1, 1.5, 2.5, 5 ];

// function count<T>(arr: T[], cb: )

export default () => ({
    add_time,
    are_ids_eq,
    caller_is_owner,
    can_continue_execution,
    can_continue_execution_error,
    cap_str_len,
    clamp,
    clone,
    colors,
    columnize,
    corrupt,
    corruption_chars,
    corruptions,
});
