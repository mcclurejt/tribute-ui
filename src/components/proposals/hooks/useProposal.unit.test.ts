import {waitFor} from '@testing-library/react';
import {renderHook, act} from '@testing-library/react-hooks';
import {SnapshotType} from '@openlaw/snapshot-js-erc712';

import {
  snapshotAPIDraftResponse,
  snapshotAPIProposalResponse,
} from '../../../test/restResponses';
import {AsyncStatus} from '../../../util/types';
import {rest, server} from '../../../test/server';
import {SNAPSHOT_HUB_API_URL} from '../../../config';
import {useProposalOrDraft} from '.';

describe('useProposalOrDraft unit tests', () => {
  test('no type: should return correct data when searching', async () => {
    await act(async () => {
      const {result} = await renderHook(() =>
        useProposalOrDraft('abc123def456')
      );

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toBe(undefined);
        expect(result.current.proposalError).toBe(undefined);
        expect(result.current.proposalStatus).toBe(AsyncStatus.STANDBY);
        expect(result.current.proposalNotFound).toBe(false);
      });

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toStrictEqual(
          snapshotAPIProposalResponse[
            Object.keys(snapshotAPIProposalResponse)[0]
          ]
        );
        expect(result.current.proposalError).toBe(undefined);
        expect(result.current.proposalStatus).toBe(AsyncStatus.FULFILLED);
        expect(result.current.proposalNotFound).toBe(false);
      });
    });
  });

  test('no type: should return correct data for draft if proposal returns no data', async () => {
    server.use(
      ...[
        rest.get(
          `${SNAPSHOT_HUB_API_URL}/api/:spaceName/proposal/:id`,
          async (_req, res, ctx) => res(ctx.json({}))
        ),
        rest.get(
          `${SNAPSHOT_HUB_API_URL}/api/:spaceName/draft/:id`,
          async (_req, res, ctx) => res(ctx.json(snapshotAPIDraftResponse))
        ),
      ]
    );

    await act(async () => {
      const {result} = await renderHook(() =>
        useProposalOrDraft('abc123def456')
      );

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toBe(undefined);
        expect(result.current.proposalError).toBe(undefined);
        expect(result.current.proposalStatus).toBe(AsyncStatus.STANDBY);
        expect(result.current.proposalNotFound).toBe(false);
      });

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toStrictEqual(
          snapshotAPIDraftResponse[Object.keys(snapshotAPIDraftResponse)[0]]
        );
        expect(result.current.proposalError).toBe(undefined);
        expect(result.current.proposalStatus).toBe(AsyncStatus.FULFILLED);
        expect(result.current.proposalNotFound).toBe(false);
      });
    });
  });

  test('no type: should return correct data if draft and proposal return no data', async () => {
    server.use(
      ...[
        rest.get(
          `${SNAPSHOT_HUB_API_URL}/api/:spaceName/proposal/:id`,
          async (_req, res, ctx) => res(ctx.json({}))
        ),
        rest.get(
          `${SNAPSHOT_HUB_API_URL}/api/:spaceName/draft/:id`,
          async (_req, res, ctx) => res(ctx.json({}))
        ),
      ]
    );

    await act(async () => {
      const {result} = await renderHook(() =>
        useProposalOrDraft('abc123def456')
      );

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toBe(undefined);
        expect(result.current.proposalError).toBe(undefined);
        expect(result.current.proposalStatus).toBe(AsyncStatus.STANDBY);
        expect(result.current.proposalNotFound).toBe(false);
      });

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toBe(undefined);
        expect(result.current.proposalError).toBeInstanceOf(Error);
        expect(result.current.proposalStatus).toBe(AsyncStatus.REJECTED);
        expect(result.current.proposalNotFound).toBe(true);
      });
    });
  });

  test('no type: should return correct data for draft if proposal errors', async () => {
    server.use(
      ...[
        rest.get(
          `${SNAPSHOT_HUB_API_URL}/api/:spaceName/proposal/:id`,
          async (_req, res, ctx) => res(ctx.status(500))
        ),
        rest.get(
          `${SNAPSHOT_HUB_API_URL}/api/:spaceName/draft/:id`,
          async (_req, res, ctx) => res(ctx.json(snapshotAPIDraftResponse))
        ),
      ]
    );

    await act(async () => {
      const {result} = await renderHook(() =>
        useProposalOrDraft('abc123def456')
      );

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toBe(undefined);
        expect(result.current.proposalError).toBe(undefined);
        expect(result.current.proposalStatus).toBe(AsyncStatus.STANDBY);
        expect(result.current.proposalNotFound).toBe(false);
      });

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toStrictEqual(
          snapshotAPIDraftResponse[Object.keys(snapshotAPIDraftResponse)[0]]
        );
        expect(result.current.proposalError).toBe(undefined);
        expect(result.current.proposalStatus).toBe(AsyncStatus.FULFILLED);
        expect(result.current.proposalNotFound).toBe(false);
      });
    });
  });

  test('no type: should return correct data if draft and proposal errors', async () => {
    server.use(
      ...[
        rest.get(
          `${SNAPSHOT_HUB_API_URL}/api/:spaceName/proposal/:id`,
          async (_req, res, ctx) => res(ctx.status(500))
        ),
        rest.get(
          `${SNAPSHOT_HUB_API_URL}/api/:spaceName/draft/:id`,
          async (_req, res, ctx) => res(ctx.status(500))
        ),
      ]
    );

    await act(async () => {
      const {result} = await renderHook(() =>
        useProposalOrDraft('abc123def456')
      );

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toBe(undefined);
        expect(result.current.proposalError).toBe(undefined);
        expect(result.current.proposalStatus).toBe(AsyncStatus.STANDBY);
        expect(result.current.proposalNotFound).toBe(false);
      });

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toBe(undefined);
        expect(result.current.proposalError).toBeInstanceOf(Error);
        expect(result.current.proposalStatus).toBe(AsyncStatus.REJECTED);
        expect(result.current.proposalNotFound).toBe(false);
      });
    });
  });

  /**
   * DRAFT
   */

  test('draft: should return correct data when searching', async () => {
    await act(async () => {
      const {result} = await renderHook(() =>
        useProposalOrDraft('abc123def456', SnapshotType.draft)
      );

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toBe(undefined);
        expect(result.current.proposalError).toBe(undefined);
        expect(result.current.proposalStatus).toBe(AsyncStatus.STANDBY);
        expect(result.current.proposalNotFound).toBe(false);
      });

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toStrictEqual(
          snapshotAPIDraftResponse[Object.keys(snapshotAPIDraftResponse)[0]]
        );
        expect(result.current.proposalError).toBe(undefined);
        expect(result.current.proposalStatus).toBe(AsyncStatus.FULFILLED);
        expect(result.current.proposalNotFound).toBe(false);
      });
    });
  });

  test('draft: should return correct data if draft returns no data', async () => {
    server.use(
      ...[
        rest.get(
          `${SNAPSHOT_HUB_API_URL}/api/:spaceName/draft/:id`,
          async (_req, res, ctx) => res(ctx.json({}))
        ),
      ]
    );

    await act(async () => {
      const {result} = await renderHook(() =>
        useProposalOrDraft('abc123def456', SnapshotType.draft)
      );

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toBe(undefined);
        expect(result.current.proposalError).toBe(undefined);
        expect(result.current.proposalStatus).toBe(AsyncStatus.STANDBY);
        expect(result.current.proposalNotFound).toBe(false);
      });

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toBe(undefined);
        expect(result.current.proposalError).toBeInstanceOf(Error);
        expect(result.current.proposalStatus).toBe(AsyncStatus.REJECTED);
        expect(result.current.proposalNotFound).toBe(true);
      });
    });
  });

  test('draft: should return correct data if draft errors', async () => {
    server.use(
      ...[
        rest.get(
          `${SNAPSHOT_HUB_API_URL}/api/:spaceName/draft/:id`,
          async (_req, res, ctx) => res(ctx.status(500))
        ),
      ]
    );

    await act(async () => {
      const {result} = await renderHook(() =>
        useProposalOrDraft('abc123def456', SnapshotType.draft)
      );

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toBe(undefined);
        expect(result.current.proposalError).toBe(undefined);
        expect(result.current.proposalStatus).toBe(AsyncStatus.STANDBY);
        expect(result.current.proposalNotFound).toBe(false);
      });

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toBe(undefined);
        expect(result.current.proposalError).toBeInstanceOf(Error);
        expect(result.current.proposalStatus).toBe(AsyncStatus.REJECTED);
        expect(result.current.proposalNotFound).toBe(false);
      });
    });
  });

  /**
   * Proposal
   */

  test('proposal: should return correct data when searching', async () => {
    await act(async () => {
      const {result} = await renderHook(() =>
        useProposalOrDraft('abc123def456', SnapshotType.proposal)
      );

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toBe(undefined);
        expect(result.current.proposalError).toBe(undefined);
        expect(result.current.proposalStatus).toBe(AsyncStatus.STANDBY);
        expect(result.current.proposalNotFound).toBe(false);
      });

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toStrictEqual(
          snapshotAPIProposalResponse[
            Object.keys(snapshotAPIProposalResponse)[0]
          ]
        );
        expect(result.current.proposalError).toBe(undefined);
        expect(result.current.proposalStatus).toBe(AsyncStatus.FULFILLED);
        expect(result.current.proposalNotFound).toBe(false);
      });
    });
  });

  test('proposal: should return correct data if proposal returns no data', async () => {
    server.use(
      ...[
        rest.get(
          `${SNAPSHOT_HUB_API_URL}/api/:spaceName/proposal/:id`,
          async (_req, res, ctx) => res(ctx.json({}))
        ),
      ]
    );

    await act(async () => {
      const {result} = await renderHook(() =>
        useProposalOrDraft('abc123def456', SnapshotType.proposal)
      );

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toBe(undefined);
        expect(result.current.proposalError).toBe(undefined);
        expect(result.current.proposalStatus).toBe(AsyncStatus.STANDBY);
        expect(result.current.proposalNotFound).toBe(false);
      });

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toBe(undefined);
        expect(result.current.proposalError).toBeInstanceOf(Error);
        expect(result.current.proposalStatus).toBe(AsyncStatus.REJECTED);
        expect(result.current.proposalNotFound).toBe(true);
      });
    });
  });

  test('proposal: should return correct data if proposal errors', async () => {
    server.use(
      ...[
        rest.get(
          `${SNAPSHOT_HUB_API_URL}/api/:spaceName/proposal/:id`,
          async (_req, res, ctx) => res(ctx.status(500))
        ),
      ]
    );

    await act(async () => {
      const {result} = await renderHook(() =>
        useProposalOrDraft('abc123def456', SnapshotType.proposal)
      );

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toBe(undefined);
        expect(result.current.proposalError).toBe(undefined);
        expect(result.current.proposalStatus).toBe(AsyncStatus.STANDBY);
        expect(result.current.proposalNotFound).toBe(false);
      });

      await waitFor(() => {
        // Assert initial state
        expect(result.current.proposal).toBe(undefined);
        expect(result.current.proposalError).toBeInstanceOf(Error);
        expect(result.current.proposalStatus).toBe(AsyncStatus.REJECTED);
        expect(result.current.proposalNotFound).toBe(false);
      });
    });
  });
});
