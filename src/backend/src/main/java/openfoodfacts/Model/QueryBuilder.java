package openfoodfacts.Model;

import java.util.HashSet;
import java.util.StringJoiner;
import java.util.concurrent.atomic.AtomicInteger;

import lombok.Data;

@Data
public class QueryBuilder {
	private HashSet<Parameter> set;

	public QueryBuilder(){
		this.set = new HashSet<Parameter>();
	}

	public QueryBuilder(HashSet<Parameter> set){
		this.set = set;
	}

	public boolean add(Parameter p){
		return this.set.add(p);
	}

	public boolean remove(Parameter p){
		return this.set.remove(p);
	}

	public void set(Parameter p){
		this.set.remove(p);
		this.set.add(p);
	}

	public String toString(){
		StringJoiner sb = new StringJoiner("&");
		AtomicInteger criteria = new AtomicInteger(0);
		this.set.forEach((Parameter p) -> {
			String arg = p.httpString();
			if (p.getClass() == SearchCriteria.class){
				Integer crit = criteria.getAndIncrement();
				// TODO: is this ugly?
				arg = String.format(arg, crit, crit, crit);
			}

			sb.add(arg);
		});

		return sb.toString();
	}
}
