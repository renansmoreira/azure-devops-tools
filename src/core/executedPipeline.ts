export type ExecutedPipeline = {
    id: number;
    name: string;
    _links: {
        'pipeline.web': { href: string },
        web: { href: string }
    };
}
