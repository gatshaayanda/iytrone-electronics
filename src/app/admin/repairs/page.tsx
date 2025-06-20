'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { firestore } from '@/utils/firebaseConfig';
import AdminHubLoader from '@/components/AdminHubLoader';

interface Blog {
  id: string;
  title: string;
  created_at?: { seconds: number };
}

export default function BlogDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Blog[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(
          query(
            collection(firestore, 'blog_posts'),
            where('admin_id', '==', 'admin'),
            orderBy('created_at', 'desc')
          )
        );
        setPosts(
          snap.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<Blog, 'id'>),
          }))
        );
      } catch (err) {
        console.error('Failed to load blog posts', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <AdminHubLoader />;

  return (
    <div className="max-w-xl mx-auto p-8 space-y-6">
      <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:underline">
        ← Back to Dashboard
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#3F76BF]">📝 Blog Manager</h1>
        <Link
          href="/admin/blog/create"
          className="inline-block bg-[#3F76BF] text-white px-4 py-2 rounded hover:opacity-90"
        >
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="italic text-gray-500">No blog posts yet.</p>
      ) : (
        <ul className="space-y-2">
          {posts.map(post => (
            <li key={post.id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium text-[#101F33]">{post.title}</p>
                {post.created_at && (
                  <p className="text-xs text-gray-400">
                    {new Date(post.created_at.seconds * 1000).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="space-x-2 text-sm">
                <Link
                  href={`/admin/blog/edit/${post.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-gray-500 hover:underline"
                >
                  View
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
