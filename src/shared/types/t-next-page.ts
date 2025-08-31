type TNextPageProps = Promise<Record<string, string>>;

export type TNextPage = { params: TNextPageProps; searchParams: TNextPageProps };
export type TNextParams = TNextPageProps;
