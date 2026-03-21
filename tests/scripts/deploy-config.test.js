import { describe, expect, it } from 'vitest';

import { injectWorkerVersion } from '../../scripts/deploy-config.js';

describe('injectWorkerVersion', () => {
	it('replaces SW_VERSION without touching KV bindings', () => {
		const config = `name = "2fa"
main = "src/worker.js"

[[kv_namespaces]]
binding = "SECRETS_KV"

[vars]
SW_VERSION = "v1"
`;

		const updated = injectWorkerVersion(config, 'v20260325-123456');

		expect(updated).toContain('SW_VERSION = "v20260325-123456"');
		expect(updated).toContain('[[kv_namespaces]]\nbinding = "SECRETS_KV"');
		expect(updated.match(/\[\[kv_namespaces\]\]/g)).toHaveLength(1);
	});

	it('throws when SW_VERSION is missing', () => {
		expect(() => injectWorkerVersion('[vars]\n', 'v20260325-123456')).toThrow(
			'在 wrangler.toml 中未找到 SW_VERSION 配置'
		);
	});
});
