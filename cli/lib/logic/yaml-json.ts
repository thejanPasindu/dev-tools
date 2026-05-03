import yaml from 'js-yaml';

export function yamlToJson(input: string): string {
    const parsed = yaml.load(input.trim());
    return JSON.stringify(parsed, null, 2);
}

export function jsonToYaml(input: string): string {
    const parsed = JSON.parse(input.trim());
    return yaml.dump(parsed, { indent: 2 });
}
