<script>
	import { KTable } from '$lib';
</script>

<div class="flex flex-col gap-2">
	<KTable zebra={true}>
		<thead>
			<tr>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Age</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Ganta</td>
				<td>Igarashi</td>
				<td>14</td>
			</tr>
			<tr>
				<td>Shiro</td>
				<td>-</td>
				<td>14-15</td>
			</tr>
			<tr>
				<td>Yō</td>
				<td>Takami</td>
				<td>~19</td>
			</tr>
			<tr>
				<td>Kiyomasa</td>
				<td>Senji</td>
				<td>26</td>
			</tr>
			<tr>
				<td>Nagi</td>
				<td>Kengamine</td>
				<td>???</td>
			</tr>
			<tr>
				<td>Toto</td>
				<td>Sakigami</td>
				<td>18</td>
			</tr>
		</tbody>
	</KTable>
	<KTable zebra color="blue">
		<thead>
			<tr>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Age</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Ganta</td>
				<td>Igarashi</td>
				<td>14</td>
			</tr>
			<tr>
				<td>Shiro</td>
				<td>-</td>
				<td>14-15</td>
			</tr>
			<tr>
				<td>Yō</td>
				<td>Takami</td>
				<td>~19</td>
			</tr>
			<tr>
				<td>Kiyomasa</td>
				<td>Senji</td>
				<td>26</td>
			</tr>
			<tr>
				<td>Nagi</td>
				<td>Kengamine</td>
				<td>???</td>
			</tr>
			<tr>
				<td>Toto</td>
				<td>Sakigami</td>
				<td>18</td>
			</tr>
		</tbody>
	</KTable>
</div>
