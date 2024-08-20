import React, { useEffect, useState } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { getTableName } from '@/lib-client/getTableName'

const PersonalStats = ({ userMetadata }: { userMetadata: any }) => {
  const [stats, setStats] = useState<{
    tweetCount: number
    followerCount: number
    followingCount: number
  } | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createBrowserClient()
      const account_id = userMetadata.provider_id

      const [tweetCount, followerCount, followingCount] = await Promise.all([
        supabase
          .from(getTableName('tweets'))
          .select('id', { count: 'exact' })
          .eq('account_id', account_id),
        supabase
          .from(getTableName('followers'))
          .select('id', { count: 'exact' })
          .eq('account_id', account_id),
        supabase
          .from(getTableName('following'))
          .select('id', { count: 'exact' })
          .eq('account_id', account_id),
      ])

      console.log({ tweetCount, followerCount, followingCount })

      setStats({
        tweetCount: tweetCount.count ?? 0,
        followerCount: followerCount.count ?? 0,
        followingCount: followingCount.count ?? 0,
      })
    }

    fetchStats()
  }, [userMetadata])

  return (
    <div>
      {stats && (
        <ul>
          <li>Username: {userMetadata.user_name}</li>
          <li>Tweets: {stats.tweetCount}</li>
          <li>Followers: {stats.followerCount}</li>
          <li>Following: {stats.followingCount}</li>
        </ul>
      )}
    </div>
  )
}

export default PersonalStats
