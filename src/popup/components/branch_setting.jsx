import React, { useState } from 'react'
// import Input from 'antd/lib/input'
import { customBranchService } from '../service'
import { PROJECT_BRANCH_KEY } from '../../common/constants'
import { useDidMount } from '../utils/hooks'

const initialForm = {
  projectBranch: null
}

export function BranchSetting() {
  const [form, setForm] = useState(initialForm)

  useDidMount(() => {
    customBranchService.getBranch(PROJECT_BRANCH_KEY)
      .then((projectBranch) => {
        console.log("run -> projectBranch", projectBranch)
        setForm({
          ...form,
          projectBranch
        })
      })
  })

  const onConfirmClick = () => {
    customBranchService.setBranch(PROJECT_BRANCH_KEY, form.projectBranch)
  }

  const onResetClick = () => {
    customBranchService.setBranch(PROJECT_BRANCH_KEY, null)
  }

  const onProjectBranchChange = (e) => {
    setForm({
      ...form,
      projectBranch: e.target.value
    })
  }
  
  return (
    <section>
    <div>
      自定义分支<input value={form.projectBranch} onChange={onProjectBranchChange}/>
    </div>
    <div>
      <button onClick={onConfirmClick}>确认</button>
      <button onClick={onResetClick}>重置</button>
    </div>
  </section>
  )
}