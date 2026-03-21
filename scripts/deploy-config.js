export function injectWorkerVersion(configText, version) {
	const updated = configText.replace(
		/^(\s*SW_VERSION\s*=\s*)"[^"]*"(\s*)$/m,
		`$1"${version}"$2`
	);

	if (updated === configText) {
		throw new Error('在 wrangler.toml 中未找到 SW_VERSION 配置');
	}

	return updated;
}
