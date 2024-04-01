import { execFileSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import * as Wreck from '@hapi/wreck';

const ianaUri = 'https://data.iana.org/TLD/tlds-alpha-by-domain.txt';

async function fetchTLDs() {
    const request = await Wreck.get(ianaUri);
    const rl = createInterface({
        input: Wreck.toReadableStream(request.payload as string),
        crlfDelay: Infinity,
    });

    let lineNumber = 0;

    const data = {
        version: '',
        domains: [] as string[],
    };

    for await (const line of rl) {
        if (lineNumber === 0) {
            if (!/^# Version \d{10}, Last Updated .+ UTC$/.test(line)) {
                throw new Error('Unexpected version line');
            }
            data.version = line;
        } else if (line.length > 0) {
            data.domains.push(line);
        }

        lineNumber++;
    }

    const formattedFile = `// ${ianaUri}
// ${data.version}

export const TLDS: string[] = [
${data.domains.map((d) => `    '${d}',`).join('\n')}
];
`;

    try {
        execFileSync(
            'git',
            [
                'diff',
                '--exit-code', // Fail if there are changes
                '--no-index',
                '-I',
                '^// #', // Ignore version line, it changes every day
                '--',
                'src/tlds.ts',
                '-', // Take stdin
            ],
            {
                input: formattedFile,
            },
        );
    } catch {
        // An error means the file is probably different
        await writeFile('./src/tlds.ts', formattedFile);
    }
}

fetchTLDs();
